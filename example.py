import streamlit as st

from streamlit_gtag import st_gtag

st.set_page_config(
    page_title="Google Gtag",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("Google Analytics :chart:")


st_gtag(
    key="gtag_send_event_a",
    id="G-LDSKH1L6V2",
    event_name="app_main_page",
    params={
        "event_category": "test_category_a",
        "event_label": "test_label_a",
        "value": 97,
    },
)

if st.button("Send Event A"):
    st_gtag(
        key="gtag_send_event_b",
        id="G-LDSKH1L6V2",
        event_name="send_event_button",
        params={
            "event_category": "test_category_b",
            "event_label": "test_label_b",
            "value": 97,
        },
    )
