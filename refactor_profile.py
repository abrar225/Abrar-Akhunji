import re

with open("src/components/BuilderMode.jsx", "r") as f:
    content = f.read()

# 1. Remove showSettings state entirely
content = content.replace("const [showSettings, setShowSettings] = useState(false);\n", "")

# 2. Add profile button to global top bar
# Look for deviceView buttons
device_view_pattern = r"""(<button onClick=\{\(\) => setDeviceView\('mobile'\)\}.*?</button>)"""
new_top_right = r"""\1
            {/* Unified Profile Button */}
            <button onClick={() => setShowProfile(true)} className={`ml-4 p-1.5 rounded-full overflow-hidden border-2 transition-all ${theme === 'dark' ? 'border-white/10 hover:border-violet-500' : 'border-black/10 hover:border-violet-500'}`} title="Profile & Settings">
              {user?.photoURL ? <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full" /> : <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white flex items-center justify-center text-[10px] font-bold">{user?.email?.charAt(0) || 'U'}</div>}
            </button>"""
content = re.sub(device_view_pattern, new_top_right, content, count=1)

# 3. Remove Settings from Left Panel
left_panel_icons = r"""<div className="flex items-center gap-1">.*?</div>"""
new_left_panel_icons = r"""<div className="flex items-center gap-1">
            <button onClick={() => setShowProjectList(true)} className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'}`} title="Projects">
               <MessageSquare size={16} />
            </button>
          </div>"""
content = re.sub(left_panel_icons, new_left_panel_icons, content, count=1, flags=re.DOTALL)

# 4. Refactor Profile Modal to include AI Settings
# Wait, it's easier to just overwrite the entire Profile Modal and delete Settings Modal.
# I'll find Settings Modal and Profile Modal and replace them.

