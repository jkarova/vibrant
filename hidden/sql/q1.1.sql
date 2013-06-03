-- Q1.1
select sum(CAST(lo_extendedprice*lo_discount as BIGINT)) as revenue from lineorder, dwdate where lo_orderdate = d_datekey and d_year = 1993 and lo_discount between 1 and 3 and lo_quantity < 25