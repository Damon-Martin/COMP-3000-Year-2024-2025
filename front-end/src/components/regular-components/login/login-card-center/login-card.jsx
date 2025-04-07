
// Mobile no margin sides but desktop does
export default function LoginCard({ color, width, height, marginSides, marginTop }) {
    return (
        <form className={`bg-[${color}] ${width} ${height} ${marginTop} md:${marginSides}`}>
            <p className="text-black">Login</p>
        </form>
    );
}
