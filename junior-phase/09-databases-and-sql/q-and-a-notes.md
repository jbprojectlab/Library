## SQL group by

"Squashes" rows together that have the same value for the given "group by" column.

```sql
SELECT cd.bookings.facid
FROM cd.bookings, cd.facilities
WHERE cd.bookings.facid = cd.facilities.facid
GROUP BY cd.bookings.facid;
```

Above is an alternative to `JOIN` syntax. Equivalent to:

```sql
SELECT cd.bookings.facid
FROM cd.bookings
JOIN cd.facilities
ON cd.bookings.facid = cd.facilities.facid
GROUP BY cd.bookings.facid;
```

## SQL count

`COUNT` interacts with `GROUP BY` so that any rows that get "sqaushed" together get summed into a count.

```sql
SELECT cd.bookings.facid, COUNT(*)
FROM cd.bookings, cd.facilities
WHERE cd.bookings.facid = cd.facilities.facid
GROUP BY cd.bookings.facid
ORDER BY cd.bookings.facid;
```

## Self table `JOIN`

[See here](https://pgexercises.com/questions/joins/self.html).

Here's our data:

```
memid firstname surname recommendedby
0 GUEST GUEST 
1 Darren  Smith 
2 Tracy Smith 
3 Tim Rownam  
4 Janice  Joplette  1
5 Gerald  Butters 1
6 Burton  Tracy 
7 Nancy Dare  4
8 Tim Boothe  3
9 Ponder  Stibbons  6
10  Charles Owen  1
11  David Jones 4
12  Anne  Baker 9
13  Jemima  Farrell 
14  Jack  Smith 1
15  Florence  Bader 9
16  Timothy Baker 13
17  David Pinker  13
20  Matthew Genting 5
21  Anna  Mackenzie 1
22  Joan  Coplin  16
24  Ramnaresh Sarwin  15
26  Douglas Jones 11
27  Henrietta Rumney  20
28  David Farrell 
29  Henry Worthington-Smyth 2
30  Millicent Purview 2
33  Hyacinth  Tupperware  
35  John  Hunt  30
36  Erica Crumpet 2
37  Darren  Smith 
```

Here's our prompt:

> How can you output a list of all members who have recommended another member? Ensure that there are no duplicates in the list, and that results are ordered by (surname, firstname).

Let's use a subquery.

```sql
SELECT firstname, surname
FROM cd.members
WHERE memid IN ( -- subquery for all member ids who have recommended someone
  SELECT DISTINCT(recommendedby)
  FROM cd.members
)
ORDER BY surname, firstname;
```

## Takeaways

- SQL is a different language that requires a different way of thinking
- SQL came about from the need for different applications to share the same language for accessing / changing persistent data
- SQL is pretty universal, (sort of) a necessary skill to have if you want to work with databases
- Our curriculum is going to move away from raw SQL soon (instead we'll use an ORM)
