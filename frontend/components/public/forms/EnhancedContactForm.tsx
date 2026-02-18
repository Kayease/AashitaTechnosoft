"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FormField } from "@/components/ui/FormField";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
}

/**
 * Enhanced contact form with live validation and animations
 */
export function EnhancedContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateField = (name: keyof FormData, value: string): string | undefined => {
        switch (name) {
            case "firstName":
                return value.length < 2 ? "First name must be at least 2 characters" : undefined;
            case "lastName":
                return value.length < 2 ? "Last name must be at least 2 characters" : undefined;
            case "email":
                return !validateEmail(value) ? "Please enter a valid email address" : undefined;
            case "message":
                return value.length < 10 ? "Message must be at least 10 characters" : undefined;
            default:
                return undefined;
        }
    };

    const handleChange = (name: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Live validation
        if (value.length > 0) {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors: FormErrors = {};
        Object.keys(formData).forEach((key) => {
            const fieldName = key as keyof FormData;
            const error = validateField(fieldName, formData[fieldName]);
            if (error) newErrors[fieldName] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset form after success
        setTimeout(() => {
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
            setIsSuccess(false);
        }, 3000);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-2xl shadow-lg text-center"
            >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Message Sent!</h3>
                <p className="text-brand-navy/70">
                    Thank you for reaching out. We'll get back to you soon!
                </p>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(value) => handleChange("firstName", value)}
                        error={errors.firstName}
                        required
                    />
                    <FormField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(value) => handleChange("lastName", value)}
                        error={errors.lastName}
                        required
                    />
                </div>

                <FormField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                    error={errors.email}
                    required
                />

                <FormField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={(value) => handleChange("message", value)}
                    error={errors.message}
                    required
                    multiline
                    rows={5}
                    placeholder="Tell us about your project..."
                />

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-gradient py-4 rounded-lg text-white font-semibold transition-opacity ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                ⭐
                            </motion.span>
                            Sending...
                        </span>
                    ) : (
                        "Send Message"
                    )}
                </motion.button>
            </form>
        </div>
    );
}
