select * from indexing_samples.employees
where age=29
order by create_time;


select * from indexing_samples.employees
where age=29
order by update_time;


select * from indexing_samples.buyers
where name like 'Aaron Ab%';


select * from indexing_samples.buyers
where name like '%ron Abshire';


select * from buyers where name='Abel Bailey';


explain SELECT * FROM indexing_samples.employees
where first_name='Dwight'
or age=30;
-- or last_name='Jaskolski'
-- or phone_number LIKE '979%'
-- where first_name='Dwight'
-- order by last_name desc
-- where employee_id=545015
-- where last_name='Abbott'
-- where employee_id=1000



explain select count(distinct order_id) from orders
JOIN buyers ON orders.buyer_name = buyers.name
where orders.product_name='Tasty Wooden Chair'
or buyers.city='Jenningsland' order by order_id;


explain select count(order_id) from (
  select * from orders where orders.product_name='Tasty Wooden Chair'
  UNION
  select orders.* from orders JOIN buyers ON orders.buyer_name = buyers.name
  where buyers.city='Jenningsland'
) as orders;


select count(orders.order_id) from orders 
JOIN (
  select * from orders where orders.product_name='Tasty Wooden Chair'
  UNION
  select orders.* from orders JOIN buyers ON orders.buyer_name = buyers.name
  where buyers.city='Jenningsland'
) as orders_filter 
ON orders.order_id=orders_filter.order_id;



explain select count(*) from orders
where EXISTS 
(select * from buyers where city='Jenningsland' and buyers.name = orders.buyer_name);

explain select count(*) from orders 
JOIN buyers ON orders.buyer_name = buyers.name
where buyers.city='Jenningsland';



select * from buyers where name like '%Rosenbaum';


select * from buyers where last_name='Rosenbaum';