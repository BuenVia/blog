from tkinter import *
from datetime import datetime

def change_text():
    heading.config(text=input.get())

window = Tk()
window.geometry(("600x600"))
window.title("My new app")
window.config(padx=50, pady=50)

heading = Label(text="Matt's App", font=("Times New Roman", 24, "bold"))
heading.grid(column=1, row=0)

intro = Label(text="This is an intro to the app")
intro.grid(column=1, row=1)

input = Entry()
input.grid(column=0, row=2)

button = Button(text="Click me...", command=change_text)
button.grid(column=1, row=3)




window.mainloop()