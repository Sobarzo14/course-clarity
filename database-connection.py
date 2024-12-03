import time
from pinecone import Pinecone, ServerlessSpec


# api_key = "pcsk_3fwQuY_T6s6Y54yGTmFeMQRf3Pp5aN1kg8sVR64mbyHFeMpsLMjWUD3BDmdLGb5h6f2Kcf"

pc = Pinecone(api_key="pcsk_3fwQuY_T6s6Y54yGTmFeMQRf3Pp5aN1kg8sVR64mbyHFeMpsLMjWUD3BDmdLGb5h6f2Kcf")

index_name = "quickstart"

pc.create_index(
    name=index_name,
    dimension=1024, # Replace with your model dimensions
    metric="cosine", # Replace with your model metric
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
            ) 
)

data = [
    {"id": "HCDD113", "text": "HCDD 113 provides an introduction to the theories, models, and tools that inform Human-Centered Design and Development."},
    {"id": "HCDD264", "text": "HCDD 264 focuses on concepts, methods, techniques, and tools for designing effective technology-enabled experiences."},
    {"id": "HCDD364W", "text": "HCDD 364W focuses on concepts, methods, and techniques for studying users and evaluating technology in the context of use."},
    {"id": "HCDD440", "text": "HCDD440 is the Human-Centered Design and Development Capstone course, and develops the research orientation and creative problem solving necessary for successful careers."}
]

embeddings = pc.inference.embed(
    model="multilingual-e5-large",
    inputs=[d['text'] for d in data],
    parameters={"input_type": "passage", "truncate": "END"}
)
print(embeddings[0])

# Wait for the index to be ready
while not pc.describe_index(index_name).status['ready']:
    time.sleep(1)

index = pc.Index(index_name)

vectors = []
for d, e in zip(data, embeddings):
    vectors.append({
        "id": d['id'],
        "values": e['values'],
        "metadata": {'text': d['text']}
    })

index.upsert(
    vectors=vectors,
    namespace="ns1"
)

print(index.describe_index_stats())

query = "Tell me about the tech company known as Apple."

embedding = pc.inference.embed(
    model="multilingual-e5-large",
    inputs=[query],
    parameters={
        "input_type": "query"
    }
)
results = index.query(
    namespace="ns1",
    vector=embedding[0].values,
    top_k=3,
    include_values=False,
    include_metadata=True
)

print(results)
