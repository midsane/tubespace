import { motion } from "framer-motion";
import { WebsiteLogo } from "./websitelogo/websitelogo";

export const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, scaleY: 0.8 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="footer items-center bg-secondary flex justify-center flex-col gap-2 max-sm:text-xs text-sm rounded-t-3xl text-neutral-content py-10 sm:p-10 origin-bottom"
        >
            <div className="sm:gap-32 justify-center flex gap-16 max-[500px]:gap-8 max-[400px]:gap-6">
                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title text-lg">Services</h6>
                    <a className="cursor-pointer hover:opacity-80 opacity-50">Automation</a>
                    <a className="cursor-pointer hover:opacity-80 opacity-50">Management</a>
                </nav>
                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title text-lg"> &copy; Tubespace</h6>
                    <a className="cursor-pointer hover:opacity-80 opacity-50">About us</a>
                    <a className="cursor-pointer hover:opacity-80 opacity-50">Contact</a>
                </nav>
                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title text-lg">Legal</h6>
                    <a className="cursor-pointer hover:opacity-80 opacity-50">Terms of use</a>
                    <a className="cursor-pointer hover:opacity-80 opacity-50">Privacy policy</a>
                </nav>
            </div>
            <div className="flex w-full justify-center items-center gap-2 pt-5">
                <WebsiteLogo noText />
                <p>made by
                    <a href="https://midsane.tech" target="_blank" rel="noopener noreferrer" className="text-accent cursor-pointer text-opacity-80 hover:text-opacity-100"> midsane</a>
                </p>
            </div>
        </motion.footer>
    );
};
