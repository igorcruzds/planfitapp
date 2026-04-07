import http.server
import socketserver

PORT = 5000

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Planfit40 running on port {PORT}")
    httpd.serve_forever()
