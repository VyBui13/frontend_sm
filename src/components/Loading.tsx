interface LoadingProps {
    isClear?: boolean;
}

const Loading = () => {
    return (
        <>
            <div
                style={{
                    animation: 'fadeIn 0.5s ease-in-out forwards',
                }}
                className="loading-item flex items-center gap-5">
                <div className="relative loading w-30 h-30 flex justify-center items-center rounded-full">
                    <div
                        style={{
                            borderWidth: '1rem',
                            borderStyle: 'solid',
                            borderTopColor: 'var(--main-color)',
                            borderRightColor: 'var(--main-scroll-color)',
                            borderBottomColor: 'var(--main-color)',
                            borderLeftColor: 'var(--main-scroll-color)',
                            animation: 'spin 1s linear infinite',
                        }}
                        className="absolute top-0 left-0 w-full h-full rounded-full bg-transparent"></div>
                    <div className="content text-[var(--main-color) font-bold]">Loading</div>
                </div>
            </div>
        </>
    )
}

export default Loading;