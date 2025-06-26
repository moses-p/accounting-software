-- Insert sample customers (these will be inserted for the authenticated user)
INSERT INTO customers (user_id, name, email, phone, address) VALUES
  (auth.uid(), 'Acme Corp', 'contact@acme.com', '+1 (555) 123-4567', '123 Business St, Suite 100, City, State 12345'),
  (auth.uid(), 'TechCorp Ltd', 'billing@techcorp.com', '+1 (555) 234-5678', '456 Tech Ave, Floor 2, Tech City, State 67890'),
  (auth.uid(), 'Global Solutions', 'accounts@global.com', '+1 (555) 345-6789', '789 Global Blvd, Suite 300, Global City, State 11111'),
  (auth.uid(), 'Innovative Systems', 'finance@innovative.com', '+1 (555) 456-7890', '321 Innovation Dr, Building A, Innovation Park, State 22222');

-- Insert sample employees
INSERT INTO employees (user_id, name, email, position, salary, pay_period, status, hire_date) VALUES
  (auth.uid(), 'John Doe', 'john.doe@company.com', 'Software Engineer', 75000, 'monthly', 'active', '2023-01-15'),
  (auth.uid(), 'Jane Smith', 'jane.smith@company.com', 'Product Manager', 85000, 'monthly', 'active', '2023-02-01'),
  (auth.uid(), 'Mike Johnson', 'mike.johnson@company.com', 'Designer', 65000, 'monthly', 'active', '2023-03-10'),
  (auth.uid(), 'Sarah Wilson', 'sarah.wilson@company.com', 'Marketing Manager', 70000, 'monthly', 'inactive', '2023-01-20');

-- Insert sample invoices (using customer IDs from the customers we just created)
WITH customer_ids AS (
  SELECT id, name FROM customers WHERE user_id = auth.uid()
)
INSERT INTO invoices (user_id, customer_id, invoice_number, amount, status, description, due_date)
SELECT 
  auth.uid(),
  c.id,
  'INV-' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  CASE 
    WHEN c.name = 'Acme Corp' THEN 1999.00
    WHEN c.name = 'TechCorp Ltd' THEN 39.00
    WHEN c.name = 'Global Solutions' THEN 299.00
    ELSE 99.00
  END,
  CASE 
    WHEN c.name = 'Acme Corp' THEN 'paid'
    WHEN c.name = 'TechCorp Ltd' THEN 'pending'
    WHEN c.name = 'Global Solutions' THEN 'overdue'
    ELSE 'draft'
  END,
  'Professional services for ' || c.name,
  CURRENT_DATE + INTERVAL '30 days'
FROM customer_ids c;

-- Insert sample expenses
INSERT INTO expenses (user_id, description, amount, category, status, expense_date, notes) VALUES
  (auth.uid(), 'Office Supplies', 234.50, 'Office', 'approved', CURRENT_DATE - INTERVAL '5 days', 'Pens, paper, and office materials'),
  (auth.uid(), 'Software License', 99.00, 'Software', 'pending', CURRENT_DATE - INTERVAL '3 days', 'Annual subscription renewal'),
  (auth.uid(), 'Business Lunch', 45.75, 'Meals', 'approved', CURRENT_DATE - INTERVAL '2 days', 'Client meeting lunch'),
  (auth.uid(), 'Travel Expenses', 567.25, 'Travel', 'pending', CURRENT_DATE - INTERVAL '1 day', 'Conference travel costs');
