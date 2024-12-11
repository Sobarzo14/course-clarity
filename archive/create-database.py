import getpass
import os
import shutil
from dotenv import load_dotenv
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
import openai

load_dotenv()

CHROMA_PATH = "chroma"
DATA_PATH = "data/books"

openai.api_key = os.environ["OPENAI_API_KEY"]

loader = DirectoryLoader("data", glob="**/*.md", loader_cls=TextLoader)
docs = loader.load()
len(docs)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=0,
    length_function=len,
    add_start_index=True
)   
chunks=text_splitter.split_documents(docs)

if os.path.exists(CHROMA_PATH):
    shutil.rmtree(CHROMA_PATH)

db = Chroma.from_documents(
    documents=chunks,
    embedding=OpenAIEmbeddings(),
    persist_directory=CHROMA_PATH
)