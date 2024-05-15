from django.contrib import admin
from .models import Querie
# Register your models here.



class QuerieAdmin(admin.ModelAdmin):

    list_display=['name','email','message']

admin.site.register(Querie,QuerieAdmin)