import React from "react";
import GlassCard from "../components/UI/GlassCard";
import { Info, BookOpen, Clock, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    About Our Library
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Welcome to the digital gateway of knowledge. Our library management system is designed to provide seamless access to a vast collection of resources.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Mission Section */}
                <motion.div variants={item}>
                    <GlassCard className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="p-6 bg-blue-100 rounded-full text-blue-600 shrink-0">
                                <BookOpen size={48} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To empower our community with information and resources that inspire learning, creativity, and personal growth. We strive to create an inclusive environment where knowledge is accessible to everyone at the click of a button.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Rules Section */}
                <motion.div variants={item}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard className="p-6 flex flex-col items-center text-center">
                            <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Borrowing Period</h3>
                            <p className="text-gray-600">
                                Maximize your reading time. Standard borrowing period for all books is <span className="font-bold text-emerald-600">14 days</span>. Renewals are available if not reserved by others.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-6 flex flex-col items-center text-center">
                            <div className="p-4 bg-purple-100 rounded-full text-purple-600 mb-4">
                                <BookOpen size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Book Limit</h3>
                            <p className="text-gray-600">
                                To ensure availability for everyone, members can borrow up to <span className="font-bold text-purple-600">3 books</span> at a time.
                            </p>
                        </GlassCard>
                    </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div variants={item}>
                    <GlassCard className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Info size={24} className="text-blue-500" /> Contact Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Visit Us</h4>
                                    <p className="text-gray-500">123 Library Lane, Knowledge City, EDU 404</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Call Us</h4>
                                    <p className="text-gray-500">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </div>
    );
}
