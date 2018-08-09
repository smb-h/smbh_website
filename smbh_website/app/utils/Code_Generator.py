import random
import string

# import datetime

# tmp = datetime.datetime.now().strftime('%Y-%b-%d')


def code_generator(size=50, chars=string.ascii_lowercase + string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


# print(code_generator())

# print(code_generator(size=200))
