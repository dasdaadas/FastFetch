
<script setup>


</script>

<template>
    <footer class="bg-gray-700 text-white py-8">
      <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Logo & About -->
          <div>
            <img src="/icon-green.png" alt="FastFetch Logo" class="w-16 h-16 mb-3" />
            <p class="text-gray-400 text-sm">
              FastFetch - Your ultimate destination for high-protein, low-fat meals delivered fast!
            </p>
          </div>
  
          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul class="space-y-2">
              <li><RouterLink to="/" class="text-gray-400 hover:text-white">Home</RouterLink></li>
              <li><RouterLink to="/menu/food" class="text-gray-400 hover:text-white">Menu</RouterLink></li>
              <li><RouterLink to="/about" class="text-gray-400 hover:text-white">About Us</RouterLink></li>
               
            </ul>
          </div>
  
          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <p class="text-gray-400 text-sm">Email: support@fastfetch.com</p>
            <p class="text-gray-400 text-sm">Phone: +1 (234) 567-890</p>
            <p class="text-gray-400 text-sm">Location: New York, USA</p>
          </div>
  
          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div class="flex space-x-4">
             
              <a href="www.instagram.com" class="text-gray-400 hover:text-white">
                <i class="fab fa-twitter"></i> 
              </a>
              <a href="www.twitter.com" class="text-gray-400 hover:text-white">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="www.facebook.com" class="text-gray-400 hover:text-white">
                <i class="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
  
        <!-- Bottom Section -->
        <div class="mt-6 text-center border-t border-gray-700 pt-4">
          <p class="text-gray-400 text-sm">&copy; 2025 FastFetch. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  