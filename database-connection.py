import time
from pinecone import Pinecone, ServerlessSpec
from langchain_text_splitters import MarkdownHeaderTextSplitter


# api_key = "pcsk_3fwQuY_T6s6Y54yGTmFeMQRf3Pp5aN1kg8sVR64mbyHFeMpsLMjWUD3BDmdLGb5h6f2Kcf"

pc = Pinecone(api_key="pcsk_3fwQuY_T6s6Y54yGTmFeMQRf3Pp5aN1kg8sVR64mbyHFeMpsLMjWUD3BDmdLGb5h6f2Kcf")


index_name = "quickstart"

index = pc.Index(index_name)

markdown_document = "# Foo\n\n    ## Bar\n\nHi this is Jim\n\nHi this is Joe\n\n ### Boo \n\n Hi this is Lance \n\n ## Baz\n\n Hi this is Molly"

headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
]

markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on)
data = markdown_splitter.split_text(markdown_document)

print(data)

# pc.create_index(
#     name=index_name,
#     dimension=1024, # Replace with your model dimensions
#     metric="cosine", # Replace with your model metric
#     spec=ServerlessSpec(
#         cloud="aws",
#         region="us-east-1"
#             ) 
# )

embeddings = pc.inference.embed(
    model="multilingual-e5-large",
    inputs=[d.page_content for d in data],
    parameters={"input_type": "passage", "truncate": "END"}
)

# Wait for the index to be ready
while not pc.describe_index(index_name).status['ready']:
    time.sleep(1)


vectors = []
for idx, (d, e) in enumerate(zip(data, embeddings), start=1):
    idx = "n" + str(idx)
    print(idx)  # Start IDs from 1
    vectors.append({
        "id": idx,  # Use the counter as the ID
        "values": e.values,  # Embedding vector
        "metadata": {"text": d.page_content}  # Metadata with document content
    })

index.upsert(
    vectors=vectors,
    namespace="ns1"
)

print(index.describe_index_stats())

query = "Tell me about IST courses."

embedding = pc.inference.embed()
query = "Tell me about IST courses at Penn State."
embeddings = pc.inference.embed(
    model="multilingual-e5-large",
    inputs=[d['text'] for d in data],
    parameters={"input_type": "passage", "truncate": "END"}
)


results = index.query(
    namespace="ns1",
    vector=embedding[0].values,
    top_k=3,
    include_values=False,
    include_metadata=True
)

print(results)
