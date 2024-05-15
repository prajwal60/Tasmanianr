from django.urls import path
from . import views


urlpatterns = [
    path("",views.index, name='hello'),
    path("reserve/",views.reserve,name="reserve"),
    path("recepie/",views.recepie,name="recepie"),
    path("boomer/",views.boomer,name="boomer"),
    path("pipelay/",views.pipelay,name="pipelay"),
    path("duckbay/",views.duckbay,name="duckbay"),
    path("retail/",views.retail,name="retail"),
    path("wholesale/",views.wholesale,name="wholesale"),
    path("restaurant/",views.restaurant,name="restaurant"),
    path("export/",views.export,name="export"),
    path("contact/",views.contact,name="contact"),
    path("about/",views.about,name="about"),
    path("result/",views.result,name="result"),
   
]

