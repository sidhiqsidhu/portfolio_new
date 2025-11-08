// Utility functions
export const scrollToSection = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Resume download removed from codebase per request; provide a friendly no-op.
export const downloadResume = async (saveAs = 'Mohammed Sidhiq M Resume.pdf') => {
  // Download the resume asset and trigger a direct browser download using the provided filename.
  // This avoids prompting the user with a file-picker and saves to the browser's default Downloads folder.
  try {
    const resumeUrl = `${process.env.PUBLIC_URL}/assets/resume.pdf`;
    const resp = await fetch(resumeUrl, { cache: 'no-cache' });
    if (!resp.ok) throw new Error(`Failed to fetch resume: ${resp.status}`);
    const blob = await resp.blob();

    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    // Use the friendly filename requested by the user
    a.download = saveAs;
    // Append, click and remove to trigger download without UI prompts
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoke the object URL shortly after
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  } catch (err) {
    console.error('Error downloading resume:', err);
    try {
      alert('Unable to download resume. Please try again or view the resume in the assets folder.');
    } catch (e) {
      // noop in non-browser contexts
    }
  }
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// SEO utilities
export const updateMetaTags = (title, description, image) => {
  document.title = title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  if (image) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }
  }
};