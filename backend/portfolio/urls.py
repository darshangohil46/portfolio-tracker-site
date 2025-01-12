from django.urls import path
from .views import *

urlpatterns = [
    path("stocks/", stock_list_view, name="stock-list"),
    path("manage-stock/", manage_stock, name="manage_stock"),
    path("metrics/", PortfolioMetricsView.as_view(), name="portfolio-metrics"),
    path("signup/", signup, name="portfolio-metrics"),
    path("login/", login_user, name="portfolio-metrics"),
    path("logout/", logout_user, name="portfolio-metrics"),
    path("get-data/", get_user_data, name="portfolio-metrics"),
    path("stocks/<int:pk>/", stock_detail, name="stock-detail"),
    path("update-profile/", update_user_profile, name="update-profile"),
    path("fetch-data/", get_random_stock_data, name="update-profile"),
    path("send-ticker/", send_ticker, name="send-ticker"),
]
