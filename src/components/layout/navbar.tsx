import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">Feedbook</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="search"
                placeholder="Cari produk, kategori, atau toko..."
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {/* Optional: bisa tambah ikon search di kiri */}
            </div>
          </div>
        </div>

        {/* User menu (dummy) */}
        <div className="ml-auto flex items-center space-x-4">
          <button
            type="button"
            className="relative h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-background hover:ring-ring/50 transition-all"
            aria-label="User menu"
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
              UN
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
