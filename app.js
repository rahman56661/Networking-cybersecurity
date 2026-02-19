const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3004;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Function to get local IP address
function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        for (const address of addresses) {
            // Skip internal (loopback) and non-IPv4 addresses
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
    return 'localhost';
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIPAddress();
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║     🌐 Networking Learning Hub Server Started! 🌐          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log('📡 Server is running on:');
    console.log(`   └─ Local:   http://localhost:${PORT}`);
    console.log(`   └─ Network: http://${localIP}:${PORT}`);
    console.log('\n💡 LAN Access:');
    console.log(`   └─ Other devices on same network can access:`);
    console.log(`      http://${localIP}:${PORT}`);
    console.log('\n✨ Features:');
    console.log('   ✓ Dark Grey Theme');
    console.log('   ✓ Responsive Design');
    console.log('   ✓ Search Functionality');
    console.log('   ✓ Progress Tracking');
    console.log('\n📝 Press Ctrl+C to stop the server\n');
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something went wrong!');
});

// Handle 404
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Page Not Found</title>
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
                    color: #e0e0e0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .error-container {
                    padding: 40px;
                    background: rgba(45, 45, 45, 0.8);
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                h1 {
                    font-size: 4rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                p {
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                }
                a {
                    color: #667eea;
                    text-decoration: none;
                    padding: 12px 30px;
                    background: rgba(102, 126, 234, 0.2);
                    border-radius: 25px;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                a:hover {
                    background: rgba(102, 126, 234, 0.4);
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="error-container">
                <h1>404</h1>
                <p>Oops! Page not found</p>
                <a href="/">← Back to Dashboard</a>
            </div>
        </body>
        </html>
    `);
});