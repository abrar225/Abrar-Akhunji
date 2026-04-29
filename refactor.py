import re

with open("src/components/BuilderMode.jsx", "r") as f:
    content = f.read()

# Replace chat history UI to project list UI
content = content.replace("const [chats, setChats] = useState([]);", "const [projects, setProjects] = useState([]);")
content = content.replace("const [currentChatId, setCurrentChatId] = useState(null);", "const [currentProjectId, setCurrentProjectId] = useState(null);\n  const [currentChatId, setCurrentChatId] = useState(null);")
content = content.replace("const [showChatHistory, setShowChatHistory] = useState(false);", "const [showProjectList, setShowProjectList] = useState(false);")

# Save and load
# This will require rewriting the Firebase logic completely. 
# It's better I just write the new methods and replace the old ones.

