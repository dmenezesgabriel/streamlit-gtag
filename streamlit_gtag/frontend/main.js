class TagManager {
  constructor(id) {
    this.id = id;
  }

  isTagManagerRegistered() {
    return [...window.parent.document.head.querySelectorAll("script")]
      .map((el) => {
        return el.src.includes(this.id);
      })
      .some((el) => {
        return el === true;
      });
  }

  async setup() {
    if (this.isTagManagerRegistered()) return;

    const ga = document.createElement("script");
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${this.id}`;

    window.parent.document.head.insertBefore(
      ga,
      window.parent.document.head.firstChild
    );

    const gtag = document.createElement("script");
    gtag.innerHTML = `
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      window.addEventListener("message", function(event) {
          if (event.data.source === "streamlit-ga") {
            gtag("event", event.data.eventName, event.data.eventData)
          }
        }
      )

      gtag("js", new Date());
      gtag("config", '${this.id}');

    `;
    window.parent.document.head.insertBefore(gtag, ga.nextSibling);
  }

  sendEvent(eventName, params) {
    window.parent.postMessage({
      source: "streamlit-ga",
      eventName: eventName,
      eventData: params,
    });
  }
}

async function onRender(event) {
  const props = event.detail.args;
  const tagManager = new TagManager(props.id);
  await tagManager.setup();
  await tagManager.sendEvent(props.event_name, props.params);
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
Streamlit.setComponentReady();
