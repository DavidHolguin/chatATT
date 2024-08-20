from django.shortcuts import render
from django.http import JsonResponse
from .models import CompanyInfo, Service, ContactInfo
from .chatgpt_integration import get_chatgpt_response

def chatbot_view(request):
    return render(request, 'chatbot/chatbot.html')

def get_response(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        context = get_context_info()
        response = get_chatgpt_response(message, context)
        return JsonResponse({'response': response})

def get_context_info():
    company_info = CompanyInfo.objects.all()
    services = Service.objects.all()
    contact_info = ContactInfo.objects.all()
    
    context = "Eres un asistente virtual para una empresa de desarrollo de soluciones digitales. "
    context += "Información de la empresa: "
    for info in company_info:
        context += f"{info.key}: {info.value}. "
    context += "Servicios ofrecidos: "
    for service in services:
        context += f"{service.name}: {service.description}. "
    context += "Información de contacto: "
    for contact in contact_info:
        context += f"{contact.type}: {contact.value}. "
    
    return context