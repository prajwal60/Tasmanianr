from django.db import models



class Querie(models.Model):
    name = models.CharField(max_length=100)
    email=models.EmailField(max_length=254)
    message = models.TextField()
    date=models.DateField( auto_now_add=True)

    
    def __str__(self):
        return self.name
