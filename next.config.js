module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port:'',
          pathname:'/**'
        },
        {
          protocol: 'https',
          hostname: 'www.gravatar.com',
          port:'',
          pathname:'/**'
        },
        {
          protocol: 'https',
          hostname: 'images.clerk.dev',
          port:'',
          pathname:'/**'
        },
      ],
    },
  }