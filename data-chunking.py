from langchain_text_splitters import MarkdownHeaderTextSplitter
from langchain_community.document_loaders import DirectoryLoader

DATA_PATH = "./CourseClarityData/all"


loader = DirectoryLoader(DATA_PATH, glob="**/*.md")
docs = loader.load()
len(docs)


# headers_to_split_on = [
#     ("#", "Header 1"),
#     ("##", "Header 2"),
#     ("###", "Header 3"),
# ]

# markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on)
# md_header_splits = markdown_splitter.split_text(markdown_document)
# print(md_header_splits)
