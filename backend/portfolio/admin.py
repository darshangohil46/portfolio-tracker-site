from django.contrib import admin
from .models import *

# Customize AdminSite
admin.site.site_header = "Port-Folio Tracker Admin Panel"
admin.site.site_title = "Admin Portal"
admin.site.index_title = "Welcome to the Port-Folio Admin Panel"
# Register your models here.
admin.site.register(Stock)
