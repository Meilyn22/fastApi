from fastapi import FastAPI, Request, HTTPException, Response
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import openai
import os

from dotenv import load_dotenv

load_dotenv()

# Get the API key from the env_values dictionary
api_key = os.getenv("API_KEY")

app = FastAPI()

openai.api_key = api_key

# Define the request payload model
class ImageRequest(BaseModel):
    prompt: str
    size: str

# Use Jinja2 templates to render HTML responses
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="templates"), name="static")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    # Render the home.html template with the request and image_url variables
    context = {"request": request, "image_url": ""}
    return templates.TemplateResponse("home.html", context)

@app.get("/privacy", response_class=HTMLResponse)
async def privacy(request: Request):
    # Render the home.html template with the request and image_url variables
    context = {"request": request, "image_url": ""}
    return templates.TemplateResponse("privacy-policy.html", context)

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    # Render the home.html template with the request and image_url variables
    context = {"request": request, "image_url": ""}
    return templates.TemplateResponse("about.html", context)

@app.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    # Render the home.html template with the request and image_url variables
    context = {"request": request, "image_url": ""}
    return templates.TemplateResponse("contact.html", context)

@app.get("/morgage", response_class=HTMLResponse)
async def mortgage_calculator(request: Request):
    # Render the home.html template with the request and image_url variables
    context = {"request": request, "image_url": ""}
    return templates.TemplateResponse("morgage.html", context)


@app.get("/robots.txt")
async def get_robots_txt():
    return """
        User-agent: *
        Allow: /*
    """

# Define the endpoint for generating images
@app.post("/create_image")
def create_image(request: ImageRequest):
    # Use OpenAI's API to generate an image
    response = openai.Image.create(
        prompt=request.prompt,
        n=1,
        size=request.size,
        model="image-alpha-001"
    )
    # Return the image URL
    if "created" in response:
        return {"image_url": response["data"][0]["url"]}
    else:
        raise HTTPException(status_code=500, detail="Image generation failed")
