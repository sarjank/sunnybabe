"""
Generate SkyView app icons (icons/icon-180.png, icon-192.png, icon-512.png)
using only Python stdlib — no dependencies required.

Run once:  python make_icons.py
"""

import struct
import zlib
import os
import math

# Palette
BG = (13, 27, 42)        # #0d1b2a — dark navy
CIRCLE = (91, 164, 245)  # #5ba4f5 — sky blue
INNER  = (255, 255, 255) # white centre dot


def make_png(path, size):
    """Create a circular logo on a dark background and save as PNG."""
    cx = cy = size / 2
    outer_r = size * 0.38   # blue disc
    inner_r = size * 0.14   # white centre

    rows = bytearray()
    for y in range(size):
        rows.append(0)  # filter byte (None)
        for x in range(size):
            dist = math.sqrt((x - cx + 0.5) ** 2 + (y - cy + 0.5) ** 2)
            if dist <= inner_r:
                rows.extend(INNER)
            elif dist <= outer_r:
                rows.extend(CIRCLE)
            else:
                rows.extend(BG)

    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', crc)

    sig  = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0))
    idat = chunk(b'IDAT', zlib.compress(bytes(rows), 6))
    iend = chunk(b'IEND', b'')

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(sig + ihdr + idat + iend)
    print(f"  Created  {path}  ({size}×{size}px)")


if __name__ == '__main__':
    base = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
    print('\nGenerating SkyView icons...')
    make_png(os.path.join(base, 'icon-180.png'), 180)
    make_png(os.path.join(base, 'icon-192.png'), 192)
    make_png(os.path.join(base, 'icon-512.png'), 512)
    print('\nDone — icons saved to icons/')
