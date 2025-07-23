export default function Footer() {
  return (
    <footer className="bg-white text-center md:text-base text-sm py-6 text-darkText mt-auto border-t">
      <p>&copy; {new Date().getFullYear()} Finvoice. All rights reserved.</p>
    </footer>
  );
}