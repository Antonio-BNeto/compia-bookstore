function Footer() {
    const footerStyle = {
        padding: '1rem',
        marginTop: '2rem',
        background: '#f8f9fa',
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#6c757d'
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear} COMPIA Bookstore. Todos os direitos reservados.</p>
        </footer>
    )
}

export default Footer