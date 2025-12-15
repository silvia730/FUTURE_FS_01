import React from 'react';

const CyberSphere = () => {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000">
            <div className="absolute inset-0 bg-gradient-radial from-teal/5 to-transparent blur-3xl" />

            {/* Simple CSS-only wireframe sphere representation */}
            <div className="relative w-64 h-64 animate-[spin_20s_linear_infinite] transform-style-3d">
                <div className="absolute inset-0 rounded-full border border-teal/20 rotate-x-45 border-dashed" />
                <div className="absolute inset-0 rounded-full border border-teal/20 rotate-y-45 border-dashed" />
                <div className="absolute inset-0 rounded-full border border-teal/20 rotate-x-90 border-dotted" />
                <div className="absolute inset-0 rounded-full border border-teal/20 rotate-y-90 border-dotted" />
                <div className="absolute inset-0 rounded-full border border-teal/30 scale-75 border-dashed animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-teal/10 scale-125" />

                {/* Floating particles */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-teal rounded-full blur-[2px] animate-ping" />
                <div className="absolute bottom-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
            </div>
        </div>
    );
};

export default CyberSphere;
