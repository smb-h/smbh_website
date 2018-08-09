# flavors/tests/test_api.py
import json
from django.test import TestCase
from django.urls import reverse
from flavors.models import Flavor


class DjangoRestFrameworkTests(TestCase):

	def setUp(self):
		Flavor.objects.get_or_create(title='title1', slug='slug1')
		Flavor.objects.get_or_create(title='title2', slug='slug2')
		self.create_read_url = reverse('flavor_rest_api')
		self.read_update_delete_url = \
		reverse('flavor_rest_api', kwargs={'slug': 'slug1'})

	def test_list(self):
		response = self.client.get(self.create_read_url)
		# Are both titles in the content?
		self.assertContains(response, 'title1')
		self.assertContains(response, 'title2')
		def test_detail(self):
		response = self.client.get(self.read_update_delete_url)
		data = json.loads(response.content)
		content = {'id': 1, 'title': 'title1', 'slug': 'slug1',
		'scoops_remaining': 0}
		self.assertEquals(data, content)

	def test_create(self):
		post = {'title': 'title3', 'slug': 'slug3'}
		response = self.client.post(self.create_read_url, post)
		data = json.loads(response.content)
		self.assertEquals(response.status_code, 201)
		content = {'id': 3, 'title': 'title3', 'slug': 'slug3',
		'scoops_remaining': 0}
		self.assertEquals(data, content)
		self.assertEquals(Flavor.objects.count(), 3)

	def test_delete(self):
		response = self.client.delete(self.read_update_delete_url)
		self.assertEquals(response.status_code, 204)
		self.assertEquals(Flavor.objects.count(), 1)

