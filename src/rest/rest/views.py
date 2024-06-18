from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        # Query all todo items from the database
        try:
            todos = db.todo_items.find()
            # Convert the todos to a list
            todos_list = [todo['description'] for todo in todos]
            # print(todos_list)
            # Return the todos as the response
            return Response(todos_list, status=status.HTTP_200_OK)
        except Exception as e:
            # Return an error response
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            # Accept a todo item from the request data
            todo_item = request.data
            # print(todo_item)
            # Persist the todo item using the db instance
            db.todo_items.insert_one(todo_item)
            # Return a success response
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            # Return an error response
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

