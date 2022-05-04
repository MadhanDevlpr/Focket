import socket

c = socket.socket()

c.connect(('localhost',9999))
name = input('Enter your name: ')
c.send(bytes(name,'utf-8'))
while True:
    msg = input('Enter message: ')
    c.send(bytes(msg,'utf-8'))
    