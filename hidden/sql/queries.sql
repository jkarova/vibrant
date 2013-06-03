-- Q1.1
select sum(CAST(lo_extendedprice*lo_discount as BIGINT)) as revenue from lineorder, dwdate where lo_orderdate = d_datekey and d_year = 1993 and lo_discount between 1 and 3 and lo_quantity < 25

CREATE INDEX Q123_INDEX1 ON LINEORDER (lo_extendedprice, lo_orderdate, lo_discount, lo_quantity)
-- Q1.2
select sum(CAST(lo_extendedprice*lo_discount as BIGINT)) as revenue from lineorder, dwdate where lo_orderdate = d_datekey and d_yearmonthnum = 199401 and lo_discount between 4 and 6 and lo_quantity between 26 and 35

-- Q1.3
select sum(CAST(lo_extendedprice*lo_discount as BIGINT)) as revenue from lineorder, dwdate where lo_orderdate = d_datekey and d_weeknuminyear = 6 and d_year = 1994 and lo_discount between 5 and 7 and lo_quantity between 26 and 35

-- Q2.1
select sum(lo_revenue), d_year, p_brand1 from lineorder, dwdate, part, supplier where lo_orderdate = d_datekey and lo_partkey = p_partkey and lo_suppkey = s_suppkey and p_category = 'MFGR#12' and s_region = 'AMERICA' group by d_year, p_brand1 order by d_year, p_brand1

-- Q2.2
select sum(lo_revenue), d_year, p_brand1 from lineorder, dwdate, part, supplier where lo_orderdate = d_datekey and lo_partkey = p_partkey and lo_suppkey = s_suppkey and p_brand1 between 'MFGR#2221' and 'MFGR#2228' and s_region = 'ASIA' group by d_year, p_brand1 order by d_year, p_brand1
CREATE INDEX Q22_LINEORDER ON LINEORDER (lo_revenue, lo_orderdate, lo_partkey, lo_suppkey)
CREATE INDEX Q22_SUPP1 ON SUPPLIER (s_suppkey)
CREATE INDEX Q22_PART1 ON PART (p_brand1)

-- Q2.3
select sum(lo_revenue), d_year, p_brand1  from lineorder, dwdate, part, supplier where lo_orderdate = d_datekey and lo_partkey = p_partkey and lo_suppkey = s_suppkey and p_brand1= 'MFGR#2239' and s_region = 'EUROPE' group by d_year, p_brand1 order by d_year, p_brand1

-- Q3.1
select c_nation, s_nation, d_year, sum(CAST (lo_revenue as BIGINT)) as revenue from customer, lineorder, supplier, dwdate where lo_custkey = c_custkey and lo_suppkey = s_suppkey and lo_orderdate = d_datekey and c_region = 'ASIA' and s_region = 'ASIA' and d_year >= 1992 and d_year <= 1997 group by c_nation, s_nation, d_year order by d_year asc, revenue desc

-- Q3.2
select c_city, s_city, d_year, sum(CAST (lo_revenue as BIGINT)) as revenue  from customer, lineorder, supplier, dwdate where lo_custkey = c_custkey  and lo_suppkey = s_suppkey and lo_orderdate = d_datekey and c_nation = 'UNITED STATES' and s_nation = 'UNITED STATES' and d_year >= 1992 and d_year <= 1997 group by c_city, s_city, d_year order by d_year asc, revenue desc

-- Q3.3 
select c_city, s_city, d_year, sum(CAST (lo_revenue as BIGINT)) as revenue from customer, lineorder, supplier, dwdate where lo_custkey = c_custkey and lo_suppkey = s_suppkey and lo_orderdate = d_datekey and (c_city='UNITED KI1' or c_city='UNITED KI5') and (s_city='UNITED KI1' or s_city='UNITED KI5') and d_year >= 1992 and d_year <= 1997 group by c_city, s_city, d_year order by d_year asc, revenue desc

-- Q3.4
select c_city, s_city, d_year, sum(CAST (lo_revenue as BIGINT)) as revenue from customer, lineorder, supplier, dwdate where lo_custkey = c_custkey and lo_suppkey = s_suppkey and lo_orderdate = d_datekey and (c_city='UNITED KI1' or c_city='UNITED KI5') and (s_city='UNITED KI1' or s_city='UNITED KI5') and d_yearmonth = 'Dec1997' group by c_city, s_city, d_year order by d_year asc, revenue desc

-- Q4.1
select d_year, c_nation, sum(CAST (lo_revenue - lo_supplycost as BIGINT)) as profit from dwdate, customer, supplier, part, lineorder where lo_custkey = c_custkey and lo_suppkey = s_suppkey and lo_partkey = p_partkey and lo_orderdate = d_datekey and c_region = 'AMERICA' and s_region = 'AMERICA' and (p_mfgr = 'MFGR#1' or p_mfgr = 'MFGR#2') group by d_year, c_nation order by d_year, c_nation

-- Q4.2
select d_year, s_nation, p_category, sum(CAST (lo_revenue - lo_supplycost as BIGINT)) as profit from dwdate, customer, supplier, part, lineorder where lo_custkey = c_custkey and lo_suppkey = s_suppkey and lo_partkey = p_partkey  and lo_orderdate = d_datekey and c_region = 'AMERICA' and s_region = 'AMERICA' and (d_year = 1997 or d_year = 1998) and (p_mfgr = 'MFGR#1' or p_mfgr = 'MFGR#2') group by d_year, s_nation, p_category order by d_year, s_nation, p_category

-- Q4.3
select d_year, s_city, p_brand1, sum(CAST (lo_revenue - lo_supplycost as BIGINT)) as profit from dwdate, customer, supplier, part, lineorder where lo_custkey = c_custkey and lo_suppkey = s_suppkey and lo_partkey = p_partkey and lo_orderdate = d_datekey and s_nation = 'UNITED STATES' and (d_year = 1997 or d_year = 1998) and p_category = 'MFGR#14' group by d_year, s_city, p_brand1 order by d_year, s_city, p_brand1
