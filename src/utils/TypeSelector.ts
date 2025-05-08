const typeClassMap: Record<string, string> = {
    primary: 'bg-blue-700 text-white hover:bg-blue-600',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
    success: 'bg-green-700 text-white hover:bg-green-600',
    danger: 'bg-red-700 text-white hover:bg-red-600',
    warning: 'bg-yellow-700 text-white hover:bg-yellow-600',
    info: 'bg-cyan-700 text-white hover:bg-cyan-600',
    light: 'bg-gray-100 text-black hover:bg-gray-200',
    dark: 'bg-gray-800 text-white hover:bg-gray-900',
    link: 'text-blue-700 underline hover:text-blue-700',
    black: 'bg-black text-white hover:bg-gray-900',
    default: '',
};

export const typeSelector = (type: string) => {
    return typeClassMap[type] || typeClassMap.default;
}