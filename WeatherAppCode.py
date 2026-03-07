"""
Weather App - Phase 6
Local development server serving the static weather app.
Run: python WeatherAppCode.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import os
import webbrowser
import threading
import socket


PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


def get_local_ip():
    """Return this machine's LAN IP address (used for iPhone access)."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return None


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(f"  {self.address_string()} - {format % args}")


def open_browser():
    webbrowser.open(f"http://localhost:{PORT}")


if __name__ == "__main__":
    local_ip = get_local_ip()

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n  SunnyBabe Weather App")
        print(f"  -------------------")
        print(f"  Serving from : {DIRECTORY}")
        print(f"  Local URL    : http://localhost:{PORT}")
        if local_ip:
            print(f"  iPhone URL   : http://{local_ip}:{PORT}")
            print(f"")
            print(f"  To install on iPhone:")
            print(f"    1. Connect iPhone to the same Wi-Fi network")
            print(f"    2. Open Safari on iPhone -> http://{local_ip}:{PORT}")
            print(f"    3. Tap Share (box with arrow) -> 'Add to Home Screen'")
        print(f"  Press Ctrl+C to stop\n")

        timer = threading.Timer(0.5, open_browser)
        timer.start()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            timer.cancel()
            print("\n  Server stopped.")
