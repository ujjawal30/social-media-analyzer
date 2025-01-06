import uuid
import random

# Define post types
post_types = ['carousel', 'reels', 'static_image']

# Open a file to write
with open("sample.sql", "w") as file:
    # Generate 300 rows
    for i in range(300):
        post_id = uuid.uuid4()
        post_type = random.choice(post_types)
        likes = random.randint(50, 500)
        shares = random.randint(5, 100)
        comments = random.randint(2, 80)
        # Write the CQL insert statement to the file
        file.write(f"INSERT INTO sample_data (post_id, post_type, likes, shares, comments) VALUES ({post_id}, '{post_type}', {likes}, {shares}, {comments});\n")

print("CQL insert statements saved to cql_inserts_300.sql")
