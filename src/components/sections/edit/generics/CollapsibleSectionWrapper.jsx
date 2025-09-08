import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CollapsibleSectionWrapper({sectionKey, label, children, onRemove}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                key={sectionKey}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="border rounded-xl p-4 mb-6 shadow-sm bg-white"
            >
                {/* Header with collapse + remove */}
                <div className="flex justify-between items-center">
                    <div>
                        <AnimatePresence>
                            {collapsed && (
                                <motion.h2
                                    key="section-title"
                                    className="text-lg font-semibold"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {label}
                                </motion.h2>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex gap-3">
                        {/* Collapse button */}
                        <button
                            type="button"
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title={collapsed ? "Expand" : "Collapse"}
                        >
                            {collapsed ? (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                            ) : (
                                <ChevronUp className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => onRemove(sectionKey)}
                            className="p-1 rounded-full hover:bg-red-50"
                            title="Remove"
                        >
                            <X className="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>

                {/* Collapsible content */}
                <AnimatePresence initial={false}>
                    {!collapsed && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-2">{children}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
