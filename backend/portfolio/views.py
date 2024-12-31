from django.shortcuts import render

# Create your views here.
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Stock
from .serializers import *
from rest_framework.decorators import api_view
from django.contrib.auth import logout, login, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = authenticate(
            username=data.get("username"), password=data.get("password")
        )
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            print("Invalid credentials")
            return JsonResponse({"detail": "Invalid credentials"}, status=401)


@csrf_exempt
def get_user_data(request):
    print(f"Session Key: {request.session.session_key}")
    print(f"Is Authenticated: {request.user.is_authenticated}")
    if request.method == "GET":
        print(
            f"Request User: {request.user}, Authenticated: {request.user.is_authenticated}"
        )
        if request.user.is_authenticated:
            try:
                user = request.user
                user_data = {
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "data": request.user.is_authenticated,
                    "id": user.id,
                }
                return JsonResponse(user_data, status=status.HTTP_200_OK)
            except Exception as e:
                return JsonResponse(
                    {"error": str(e)}, status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return JsonResponse(
                {"status": "error", "message": "User is not authenticated."}, status=401
            )
    else:
        return JsonResponse(
            {"status": "error", "message": "Invalid method."}, status=405
        )


@csrf_exempt
@api_view(["POST"])
def signup(request):
    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = authenticate(
                request,
                username=request.data.get("username"),
                password=request.data.get("password"),
            )
            print(user)
            if user is not None:
                login(request, user)
                return Response(
                    {"message": "Login successful"}, status=status.HTTP_200_OK
                )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def logout_user(request):
    print(request.user.is_authenticated)
    logout(request)
    response = JsonResponse({"status": "success", "message": "Logged out successfully"})
    return response


@api_view(["GET"])
def stock_list_view(request):
    print(request.user, request.user.is_authenticated)
    if request.method == "GET":
        stocks = Stock.objects.filter(user=request.user)
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({"error": "Invalid method"}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def manage_stock(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        try:
            if not request.user.is_authenticated:
                return JsonResponse(
                    {"error": "User not authenticated"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            existing_stock = Stock.objects.filter(
                name=data.get("name"), ticker=data.get("ticker"), user=request.user
            ).first()
            print(existing_stock)

            if existing_stock:
                try:
                    existing_stock.quantity += int(data.get("quantity", 0))
                    existing_stock.buy_price = data.get("buy_price")
                    existing_stock.save()

                    serializer = StockSerializer(existing_stock)
                    return JsonResponse(serializer.data, status=status.HTTP_200_OK)
                except ValueError:
                    return JsonResponse(
                        {"error": "Invalid quantity provided"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            else:
                serializer = StockSerializer(data=data)
                if serializer.is_valid():
                    serializer.save(user=request.user)
                    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
                return JsonResponse(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    else:
        return JsonResponse(
            {"error": "Invalid method"}, status=status.HTTP_400_BAD_REQUEST
        )


class PortfolioMetricsView(APIView):
    def get(self, request):
        total_value = sum(
            stock.quantity * stock.buy_price
            for stock in Stock.objects.filter(user=request.user)
        )
        top_stock = (
            Stock.objects.filter(user=request.user).order_by("-buy_price").first()
        )
        data = {
            "totalValue": total_value,
            "topStock": top_stock.name if top_stock else None,
        }
        return Response(data, status=status.HTTP_200_OK)


@csrf_exempt
def stock_detail(request, pk):
    print(json.loads(request.body))
    try:
        stock = Stock.objects.get(pk=pk)
    except Stock.DoesNotExist:
        return JsonResponse(
            {"detail": "Stock not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PUT":
        serializer = StockSerializer(stock, data=json.loads(request.body))
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        stock.delete()
        return JsonResponse(
            {"message": "Stock deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )

    return JsonResponse(
        {"message": "Invalid method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )
