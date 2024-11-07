-- Create Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    document_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    file_type VARCHAR(10) NOT NULL CHECK (file_type IN ('pdf', 'doc', 'docx')),
    number_of_pages INTEGER NOT NULL CHECK (number_of_pages >= 1),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Feedbacks table
CREATE TABLE feedbacks (
    feedback_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (
        rating >= 1
        AND rating <= 5
    ),
    submission_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Notifications table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    sent_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create PageOrders table
CREATE TABLE page_orders (
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    number_of_a4_pages INTEGER NOT NULL CHECK (number_of_a4_pages >= 1),
    transaction_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    o_state VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (o_state IN ('pending', 'completed', 'failed')),
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Printers table
CREATE TABLE printers (
    printer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    state VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (state IN ('active', 'inactive', 'maintenance')),
    campus VARCHAR(255) NOT NULL,
    building VARCHAR(255) NOT NULL,
    room VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create PrintOrders table
CREATE TABLE print_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    document_id INTEGER NOT NULL,
    printer_id INTEGER NOT NULL,
    start_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMPTZ,
    sided VARCHAR(10) NOT NULL CHECK (sided IN ('one-sided', 'two-sided')),
    paper_size VARCHAR(5) NOT NULL CHECK (paper_size IN ('A4', 'A3', 'A5')),
    paper_orientation VARCHAR(10) NOT NULL CHECK (paper_orientation IN ('portrait', 'landscape')),
    pages_per_sheet INTEGER NOT NULL CHECK (pages_per_sheet >= 1),
    number_of_copies INTEGER NOT NULL CHECK (number_of_copies >= 1),
    scale INTEGER NOT NULL CHECK (
        scale >= 1
        AND scale <= 100
    ),
    p_state VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
        p_state IN ('pending', 'printing', 'completed', 'failed')
    ),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    available_a4_pages INTEGER DEFAULT 0,
    last_modified TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(10) NOT NULL CHECK (role IN ('client', 'SPSO')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spsos (
    spso_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraints
ALTER TABLE feedbacks ADD CONSTRAINT fk_user_feedback FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE notifications ADD CONSTRAINT fk_user_notification FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE page_orders ADD CONSTRAINT fk_user_page_order FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE print_orders ADD CONSTRAINT fk_user_print_order FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE print_orders ADD CONSTRAINT fk_document_print_order FOREIGN KEY (document_id) REFERENCES documents (id);

ALTER TABLE print_orders ADD CONSTRAINT fk_printer_print_order FOREIGN KEY (printer_id) REFERENCES printers (id);
