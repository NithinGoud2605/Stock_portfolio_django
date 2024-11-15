from channels.generic.websocket import AsyncWebsocketConsumer
import json

class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Handle disconnection (optional)
        pass

    async def receive(self, text_data):
        # Parse received JSON data
        data = json.loads(text_data)

        # Process and send a response back
        await self.send(text_data=json.dumps({"message": "Received!"}))
