import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              title: "Marketplace",
              links: ["Explore", "Collections", "Artists", "Activity"],
            },
            {
              title: "My Account",
              links: ["Profile", "Favorites", "Watchlist", "My Collections"],
            },
            {
              title: "Resources",
              links: ["Help Center", "Platform Status", "Partners", "Blog"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Terms of Service", "Privacy Policy"],
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <path d="M5 22h14"></path>
                <path d="M5 2h14"></path>
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
              </svg>
            </div>
            <span className="font-semibold text-lg">Buterin</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Buterin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
