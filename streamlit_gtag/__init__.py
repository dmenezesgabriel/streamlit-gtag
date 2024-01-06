import os

import streamlit.components.v1 as components

parent_dir = os.path.dirname(__file__)
build_dir = os.path.join(parent_dir, "frontend")
_component_func = components.declare_component(name="st_gtag", path=build_dir)


def st_gtag(*args, **kwargs):
    # Command pattern
    # return (func, func, func, ...)
    component_value = _component_func(*args, **kwargs)
    return component_value
