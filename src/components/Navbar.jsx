// components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <button className="w-10 h-10 bg-gray-500 rounded-full"></button> {/* Icon 1 */}
      <button className="w-10 h-10 bg-gray-500 rounded-full"></button> {/* Icon 2 */}
      <button className="w-10 h-10 bg-gray-500 rounded-full"></button> {/* Icon 3 */}
      <button className="w-10 h-10 bg-gray-500 rounded-full"></button> {/* Icon 4 */}
    </div>
  );
};

export default Navbar;
