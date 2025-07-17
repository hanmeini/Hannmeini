/** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          // Ganti 'ylmnyjlrzbewslajmjze.supabase.co' dengan hostname dari URL Supabase Anda.
          // Anda bisa melihatnya di URL gambar yang tersimpan di tabel.
          hostname: 'ylmnyjlrzbewslajmjze.supabase.co', 
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
  };

export default nextConfig;
