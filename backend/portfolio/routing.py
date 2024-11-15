from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/some-endpoint/$', consumers.YourConsumer.as_asgi()),
]
